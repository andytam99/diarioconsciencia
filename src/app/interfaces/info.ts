import type {
    ArbitraryTypedObject,
    PortableTextBlock
  } from '@portabletext/types'

export interface Info {
    body: string | ArbitraryTypedObject | PortableTextBlock;
}