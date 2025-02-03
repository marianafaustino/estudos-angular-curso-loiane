import { FormControl, FormGroup } from "@angular/forms";

export class FormValidator {

    static equalsTo(otherField: string){
        const validator = (formControl: FormControl)=>{
            if(otherField == null){
                throw new Error('É necessário informar um campo.')
            } 

            if(!formControl.root || !(<FormGroup>formControl.root).controls){
                return null
            }
            const field = (<FormGroup>formControl.root).get(otherField)

            if(!field){
                throw new Error('É necessário informar um campo válido.')
            }

            if(field.value !== formControl.value){
                return { equalsTo: otherField }
            } 
            return null
        }
        return validator
    }

    static getErrorMsg(fieldName: string, validatorName: string, validatorValue?: any ){
        const config: { [key: string]: string } ={
            'required': `${fieldName} é obrigatório.`,
            'minlength': `${fieldName} precisa ter no mínimo ${validatorValue.requiredLength} caracteres`
        }

        return config[validatorName]
    }
}
