import { AppError } from './../errors/AppError';
import {Request, Response} from 'express'
import { getCustomRepository } from 'typeorm';
import { SurveysUsersRepository } from '../repositories/SurveysUsersRepository';

//Route params => parametros que compõem a rota 
//Ex: /:id... /:materia/:nota

//Query params => parametros de busca, paginação, não obrigatórios 
//Ex: /:id?Fortaleza&&Aluno


class AnswerController {

    async execute(request: Request, response: Response) {
        const { value } = request.params;
        const { u } = request.query;
       
        const surveysUsersRepository = getCustomRepository(SurveysUsersRepository);

        const surveyUser = await surveysUsersRepository.findOne({
            id: String(u),
        });

        if(!surveyUser) {
            throw new AppError("Survey User does not exists!")
        }

        surveyUser.value = Number(value);

        await surveysUsersRepository.save(surveyUser);

        return response.json(surveyUser);


    }

}

export {AnswerController}