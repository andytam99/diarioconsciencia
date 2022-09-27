import type {
    ArbitraryTypedObject,
    PortableTextBlock
  } from '@portabletext/types'

export interface Terminos {
    body: string | ArbitraryTypedObject | PortableTextBlock;
}