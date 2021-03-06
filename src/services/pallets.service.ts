import Pallet from '../models/Pallet.model';
import PalletCategory, { IPalletCategoryAttributes } from '../models/PalletCategory.model';
import PalletAuthor from '../models/PalletAuthor.model';
import PalletDependency from '../models/PalletDependency.model';
import { EPalletCategories, ESupportedPallets } from '../pallets/pallets.types';
import { Op } from 'sequelize';

class PalletsService {
  public static async list(category?: EPalletCategories): Promise<Pallet[]> {

    let categoryFilter: Partial<IPalletCategoryAttributes> | undefined;

    // Since a category filter was provided, we add the filter to the
    // where clause
    if (category) {
      categoryFilter = {
        category
      };
    }

    return Pallet.findAll({
      include: [
        { model: PalletCategory, where: categoryFilter },
        { model: PalletAuthor },
        { model: PalletDependency, as: 'dependencies' },
        { model: PalletDependency, as: 'dependants' },
      ]
    })
  }

  public static async pallet(name: ESupportedPallets): Promise<Pallet> {
    return Pallet.findOne({
      where: {
        name
      },
      include: [
        { model: PalletCategory },
        { model: PalletAuthor },
        { model: PalletDependency, as: 'dependencies' },
        { model: PalletDependency, as: 'dependants' },
      ]
    })
  }

  public static async incrementNumberOfDownloads(pallets: ESupportedPallets[], by: number = 1): Promise<Pallet> {
    return Pallet.increment('downloads', {
      by,
      where: {
        [Op.or]: pallets.map(palletName => ({
          name: palletName
        }))
      }
    })
  }
}

export default PalletsService;
