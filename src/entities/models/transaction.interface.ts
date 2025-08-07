export interface ITransaction {
  //declare your own transaction instance here
  rollback: () => void;
  commit: () => void;
}
