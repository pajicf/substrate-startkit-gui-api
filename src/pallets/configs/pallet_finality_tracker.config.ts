import {
  ECommonAuthors,
  EPalletCategories,
  EPalletModuleParts,
  ESubstrateVersion,
  ESupportedPallets,
  IPalletConfig
} from '../pallets.types';

enum EPalletFinalityTrackerTraits {
  OnFinalizationStalled= 'OnFinalizationStalled',
  WindowSize= 'WindowSize',
  ReportLatency= 'ReportLatency'
}

const palletDescription = [
  'FRAME Pallet that tracks the last finalized block, as perceived by block authors.'
].join('\n');

const PalletFinalityTrackerConfig: IPalletConfig<EPalletFinalityTrackerTraits> = {
  name: ESupportedPallets.PALLET_FINALITY_TRACKER,
  metadata: {
    compatibility: ESubstrateVersion.TWO,
    size: 4850,
    updated: 1600801158,
    license: 'Apache-2.0',
    authors: [ECommonAuthors.PARITY_TECHNOLOGIES],
    categories: [EPalletCategories.CONSENSUS],
    shortDescription: 'FRAME pallet for finality tracking',
    description: palletDescription
  },
  dependencies: {
    pallet: {
      alias: 'finality-tracker',
      package: 'pallet-finality-tracker',
      version: '2.0.0',
      defaultFeatures: false
    }
  },
  runtime: {
    palletTraits: {
      [EPalletFinalityTrackerTraits.OnFinalizationStalled]: '()',
      [EPalletFinalityTrackerTraits.WindowSize]: {
        type: 'BlockNumber',
        value: '101'
      },
      [EPalletFinalityTrackerTraits.ReportLatency]: {
        type: 'BlockNumber',
        value: '1000'
      },
    },
    constructRuntime: {
      modules: [
        EPalletModuleParts.MODULE,
        EPalletModuleParts.CALL,
        EPalletModuleParts.STORAGE
      ]
    }
  }
}

export default PalletFinalityTrackerConfig;
