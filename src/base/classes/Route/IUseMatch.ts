export interface IUseMatch<Params> {
  params: Params;
  pathname: string;
  pathnameBase: string;
  pattern: {
    caseSensitive: boolean;
    end: boolean;
    path: string;
  };
}
