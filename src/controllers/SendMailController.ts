import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { SurveyRepository } from '../repositories/SurveyRepository';
import { SurveysUsersRepository } from '../repositories/SurveysUsersRepository';
import { UserRepository } from '../repositories/UserRepository';
import SendMailService from '../services/SendMailService';
import {resolve} from 'path';


class SendMailController {

    async execute(request: Request, response: Response){
        const {email, survey_id} = request.body;

        const usersRepository = getCustomRepository(UserRepository)
        const surveysRepository = getCustomRepository(SurveyRepository)
        const surveysUsersRepository = getCustomRepository(SurveysUsersRepository)

        const userExists = await usersRepository.findOne({email})


        if(!userExists){
            return response.status(400).json({
                error: "User does not exists"
            })
        }

        const surveyExists = await surveysRepository.findOne({id: survey_id})

        if(!surveyExists){
            return response.status(400).json({
                error: "Survey does not exists"
            })
        }

        const variables = {
            name: userExists.name,
            title: surveyExists.title,
            description: surveyExists.description,
            user_id: userExists.id,
            link: process.env.URL_MAIL
        }

        const npsPath = resolve(__dirname, "..", "views", "emails", "npsMail.hbs");

        const surveyUserExists = await surveysUsersRepository.findOne({
            where: [{user_id: userExists.id}, {value:null}],
            relations: ["user", "survey"]
        })

        if(surveyUserExists){
            await SendMailService.execute(email, surveyExists.title, variables, npsPath)
            return response.json(surveyUserExists);
        }

        //Salvar informações na tabela surveyUser
        const surveyUser = surveysUsersRepository.create({
            user_id: userExists.id,
            survey_id 
        })
        await surveysUsersRepository.save(surveyUser)

        //Enviar email para o usuário


        await SendMailService.execute(email, surveyExists.title, variables, npsPath);

        return response.json(surveyUser)

    }

    

}

export {SendMailController}