export interface EventDispatcherInterface {
  dispatch(eventName: string, metaData: any);
}