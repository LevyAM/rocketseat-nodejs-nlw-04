

import { request } from 'express';
import { EntityRepository, Repository } from 'typeorm';
import { Survey } from '../models/Survey';
import { User } from '../models/User';

@EntityRepository(Survey)
class SurveyRepository extends Repository <Survey>{
    


}

export {SurveyRepository}