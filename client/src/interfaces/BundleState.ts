export interface BundleState {
  [key: string]: {
    loading: boolean;
    code: string;
    error: string;
  };
}
