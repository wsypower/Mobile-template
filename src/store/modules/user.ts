import { VuexModule, Module, Action, Mutation, getModule } from 'vuex-module-decorators';
import store from '@/store';

interface IUSer {
  [propName: string]: any;
}

export interface IUserState {
  user: IUSer;
}

@Module({ dynamic: true, store, name: 'user' })
class User extends VuexModule implements IUserState {
  // 用户角色信息
  public user = {
    userId: '',
    realname: '',
  };

  /**
   * 获取 userId
   *
   * @readonly
   * @private
   * @memberof User
   */
  public get userId() {
    return this.user.userId;
  }

  /**
   * 获取 realname
   *
   * @readonly
   * @private
   * @memberof User
   */
  public get getRelName() {
    return this.user.realname;
  }
  /**
   * 设置user
   *
   * @author weiyafei
   * @date 2019-11-21
   * @private
   * @param {*} user
   * @memberof User
   */
  @Mutation
  public SET_USER(user: any): void {
    this.user = user;
  }

  // @Action
  // public async GetUser() {}
}

export const UserModule = getModule(User);
