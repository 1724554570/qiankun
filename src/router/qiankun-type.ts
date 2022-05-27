
interface NextToEntity {
  path?: string;
  hash?: string;
  fullPath: string;
}

interface MicroEntity {
  microName: string;
}

interface ItemEntity {
  children: any;
  path?: string;
}

export {
  NextToEntity,
  MicroEntity,
  ItemEntity
}