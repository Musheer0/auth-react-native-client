import { SignInCredentialsArgsSchema, SignInCredentialsErrorResponseSchema, SignUpArgsSchema, SignUpResponseSchema, TSignInCredentialsArgs, TSignUpArgs } from "@/schemas/auth-api.schema";

const base_url = 'https://49d63afbef85.ngrok-free.app';
const auth_api_path = '/api/v1/auth/'
enum methods  {
  GET = 'GET',
  POST= 'POST',
  DELETE='DELETE',
  PATCH='PATCH'
}
const bearerToken = (token:string)=> ({"Authorization":`Bearer ${token}`})
export class AuthClient {
  async SignInCredentialsUser(payload:TSignInCredentialsArgs){
    const schema =SignInCredentialsArgsSchema.safeParse(payload)
    if(schema.error){
      return {error:schema.error.message}
    }
  try {
    const req = await  fetch(base_url+auth_api_path+'sign-in/credentials',{method:methods.POST,body:JSON.stringify(payload)});
    if(req.ok){
      const res = await req.json()
      console.log(res) //auth token
      return {success:true}
    }
    if(req.status<500){
      const res = await req.json()
     if( 'error' in res){
      return {error:res.message};
     }
     else{
      const validated_data = SignInCredentialsErrorResponseSchema.safeParse(res);
      if(validated_data.error){
              return {error:validated_data.error.message}
      }
      return {verification_id:validated_data.data.verification_id,mfa:true}
     }
    }
    
        return {error:'Internal server error'}

  } catch (error) {
    console.log(error)
    return {error:'Internal server error3'}
  }
  }
    async SignUpCredentialsUser(payload:TSignUpArgs){
    const schema =SignUpArgsSchema.safeParse(payload)
    if(schema.error){
      return {error:schema.error.message}
    }
  try {
    const req = await  fetch(base_url+auth_api_path+'sign-up',{method:methods.POST,body:JSON.stringify(payload)});
    if(req.ok){
      const res = await req.json()
      const validated_data = SignUpResponseSchema.safeParse(res);
       if(validated_data.error){
              return {error:validated_data.error.message}
      }
      console.log(res) //auth token
      return {verification_id:validated_data.data.verification_id}
    }
    if(req.status<500){
      const res = await req.json()
     if( 'error' in res){
      return {error:res.message as string};
     }
    }
        return {error:'Internal server error'}

  } catch (error) {
    console.log(error)
    return {error:'Internal server error3'}
  }
  }
}

export const auth = new AuthClient()