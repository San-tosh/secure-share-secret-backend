interface TransactionalInterface {
  commit();
  begin();
  rollback();
  release();
  save(data: any);
}