/// <reference lib="es2021" />
import * as reactRouter from 'react-router-dom';
import { IUseMatch } from './IUseMatch';
import { TSetGenericObject } from '../../utils';

type Url<T> = T extends object ? (args: T) => string : string;

interface IRouteArgs<Params> {
  path: string;
  url?: Url<Params>;
  parent?: Route<any>;
}

interface IRoute<Params> {
  path: string;
  fullPath: string;
  url: Url<Params>;
  useParams: <Res>(
    fn: (params: TSetGenericObject<Params, string>) => Res,
  ) => Res | TSetGenericObject<Params, string>;
  useMatch: () => IUseMatch<TSetGenericObject<Params, string>> | null;
}

export class Route<Params> implements IRoute<Params> {
  private readonly _path: string;
  private readonly _fullPath: string;
  private readonly _url: Url<Params>;
  private readonly _parent?: Route<any>;

  public constructor(args: IRouteArgs<Params>) {
    this._parent = args.parent;
    this._path = args.path;
    this._fullPath = this.getFullPath(args.path);
    this._url = this.getUrl(args.url);
  }

  private getFullPath(path: string): string {
    if (!this._parent) return path;
    const slash = this._parent._fullPath !== '/' ? '/' : '';
    const fullPath = `${this._parent._fullPath}${slash}${path}`;
    return fullPath.replaceAll('/*', '');
  }

  public get path(): string {
    return this._path;
  }

  public get url(): Url<Params> {
    return this._url;
  }

  public get fullPath(): string {
    return this._fullPath;
  }

  private getUrl(url?: Url<Params>): Url<Params> {
    if (url) return url;

    if (typeof this._parent?._url === 'function') {
      throw new Error(
        `Put the url in the route: "${this._path}"
        full path "${this._fullPath}"`,
      );
    }

    // @ts-ignore
    return this._fullPath;
  }

  public useParams<Res>(
    fn: (params: TSetGenericObject<Params, string>) => Res,
  ): Res;
  public useParams(): TSetGenericObject<Params, string>;
  public useParams<Res>(
    fn?: (params: TSetGenericObject<Params, string>) => Res,
  ): TSetGenericObject<Params, string> | Res {
    const params = reactRouter.useParams() as TSetGenericObject<Params, string>;

    if (typeof fn === 'function') return fn(params);
    return params;
  }

  public useMatch(): IUseMatch<TSetGenericObject<Params, string>> | null {
    // @ts-ignore
    return reactRouter.useMatch(this._fullPath);
  }
}
