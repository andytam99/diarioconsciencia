import type {
    ArbitraryTypedObject,
    PortableTextBlock
  } from '@portabletext/types'

export interface Privacy {
    body: string | ArbitraryTypedObject | PortableTextBlock;
}