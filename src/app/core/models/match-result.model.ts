import { OrganisationUnit } from './org-unit.model'
import { Feature } from './feature.model'

export interface Result { 
    feature: Feature
    organisationUnits:OrganisationUnit[]
}