import { action, computed, makeObservable, observable } from 'mobx';
import { ERequestStatus } from '../../constants';
import { getApiErrorMessage } from '../../api/getApiError.ts';

export class BaseApiStoreClass<T> {
  public data: T | null = null;
  public status: ERequestStatus = ERequestStatus.Pending;

  public constructor() {
    makeObservable(this, {
      data: observable,
      status: observable,
      setLoading: action,
      setError: action,
      setPending: action,
      setReady: action,
      setFinished: action,
      isLoading: computed,
      isError: computed,
    });
  }

  public setLoading(): void {
    this.status = ERequestStatus.Loading;
  }

  public setPending(): void {
    this.status = ERequestStatus.Pending;
  }

  public setReady(): void {
    this.status = ERequestStatus.Ready;
  }

  public setError(e: unknown): void {
    this.status = ERequestStatus.Error;
    console.error(getApiErrorMessage(e));
  }

  public setFinished(data?: T): void {
    this.data = data || null;
    this.status = ERequestStatus.Ready;
  }

  public get isLoading(): boolean {
    return this.status === ERequestStatus.Loading;
  }

  public get isReady(): boolean {
    return this.status === ERequestStatus.Ready;
  }

  public get isError(): boolean {
    return this.status === ERequestStatus.Error;
  }
}
