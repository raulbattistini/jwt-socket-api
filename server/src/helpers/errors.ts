export class ErrorsApi extends Error{
   public readonly statusCode: number

   constructor(message: string, statusCode: number){
      super(message)
      this.statusCode = statusCode
   }
}

export class UnAuthError extends ErrorsApi{
   constructor(message: string){
      super(message, 401)
   }
}