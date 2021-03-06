import {
  ECommonAuthors,
  EPalletCategories,
  EPalletModuleParts,
  ESubstrateVersion,
  ESupportedPallets,
  IPalletConfig
} from '../pallets.types';

enum EPalletNicksTraits {
  Event = 'Event',
  Currency = 'Currency',
  ReservationFee = 'ReservationFee',
  Slashed = 'Slashed',
  ForceOrigin = 'ForceOrigin',
  MinLength = 'MinLength',
  MaxLength = 'MaxLength'
}

const palletDescription = [
  'Nicks is an example module for keeping track of account names on-chain.',
  'It makes no effort to create a name hierarchy, be a DNS replacement or provide reverse lookups. Furthermore, the weights attached to this module\'s dispatchable functions are for demonstration purposes only and have not been designed to be economically secure.',
  'Do not use this pallet as-is in production.'
].join('\n');

const PalletNicksConfig: IPalletConfig<EPalletNicksTraits> = {
  name: ESupportedPallets.PALLET_NICKS,
  metadata: {
    shortDescription: 'FRAME pallet for nick management',
    authors: [ECommonAuthors.PARITY_TECHNOLOGIES],
    categories: [
      EPalletCategories.IDENTITY
    ],
    updated: 1600801158,
    compatibility: ESubstrateVersion.TWO,
    description: palletDescription,
    license: 'Apache-2.0',
    size: 5163
  },
  dependencies: {
    pallet: {
      alias: 'nicks',
      package: 'pallet-nicks',
      version: '2.0.0',
      defaultFeatures: false,
    },
    additionalPallets: [
      { palletName: ESupportedPallets.PALLET_BALANCE, shouldImplement: false }
    ]
  },
  runtime: {
    constructRuntime: {
      modules: [
        EPalletModuleParts.MODULE,
        EPalletModuleParts.CALL,
        EPalletModuleParts.EVENT,
        EPalletModuleParts.STORAGE
      ],
      generic: {
        [EPalletModuleParts.EVENT]: true,
      }
    },
    palletTraits: {
      [EPalletNicksTraits.Currency]: 'Balances',
      [EPalletNicksTraits.Event]: 'Event',
      [EPalletNicksTraits.ForceOrigin]: 'EnsureRoot<AccountId>',
      [EPalletNicksTraits.MinLength]: {
        value: '8',
        type: 'usize'
      },
      [EPalletNicksTraits.MaxLength]: {
        value: '32',
        type: 'usize'
      },
      [EPalletNicksTraits.Slashed]: '()',
      [EPalletNicksTraits.ReservationFee]: {
        value: '100',
        type: 'u128'
      }
    }
  }
}

export default PalletNicksConfig;
