interface ILoginUserRequestBody {
  email: string;
  password: string;
}
interface IRegisterUserRequestBody extends ILoginUserRequestBody {
  name: string;
}
export type { ILoginUserRequestBody, IRegisterUserRequestBody };
