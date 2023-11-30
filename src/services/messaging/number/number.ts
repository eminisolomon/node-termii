import { TermiiCore } from '../../../api'
import {
  ISendMessageWithNumber,
  ISendMessageWithNumberResponse,
} from '../../../interfaces'
import { IAxiosStruct, handleErrors } from '../../../utils'

export class Number extends TermiiCore {
  constructor(apiKey: string) {
    super(apiKey)
  }

  public async sendMessageWithNumber(
    data: ISendMessageWithNumber
  ): Promise<ISendMessageWithNumberResponse> {
    try {
      const requestObj: IAxiosStruct = {
        method: 'POST',
        url: `/sms/number/send`,
        data,
      }

      const response = await this.useRequest(requestObj)

      return response?.data as ISendMessageWithNumberResponse
    } catch (error) {
      return handleErrors(error)
    }
  }
}
