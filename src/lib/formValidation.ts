import { EMAIL_REGEX, PASSWORD_REGEX } from '../constants'

type ParamsType = {
    fieldName: string
    fieldValue: string
}

export const validationErrorMessage = (params: ParamsType) => {
    const { fieldName, fieldValue } = params
    let errMsg = ''

    switch (fieldName) {
        case 'username':
            errMsg = fieldValue.length < 1 ? 'Username is required' : ''
            break

        case 'email':
            if (fieldValue.length) {
                errMsg = EMAIL_REGEX.test(fieldValue) ? '' : 'Enter valid email'
            } else {
                errMsg = 'Email is required'
            }
            break

        case 'password':
            if (fieldValue.length) {
                errMsg = PASSWORD_REGEX.test(fieldValue)
                    ? ''
                    : 'Enter valid password'
            } else {
                errMsg = 'Password is Required'
            }
            break

        case 'title':
            errMsg = fieldValue.length < 1 ? 'Title is required' : ''
            break

        case 'description':
            errMsg = fieldValue.length < 1 ? 'Description is required' : ''
            break

        case 'comment':
            errMsg = fieldValue.length < 1 ? 'Comment is required' : ''
            break

        default:
            break
    }
    return errMsg
}
