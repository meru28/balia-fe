import { getNewsPromo } from '@/app/actions/promo';
import PopupDialog from '@/components/shared/Popup/PromoPopup';

export default async function PromoWrapper() {
  const promoData = await getNewsPromo();

  return <PopupDialog promoData={promoData} />;
}