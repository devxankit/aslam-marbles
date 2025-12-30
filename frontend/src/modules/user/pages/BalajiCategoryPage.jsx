import MurtiCategoryTemplate from '../components/MurtiCategoryTemplate'
import { usePageTranslation } from '../../../contexts/PageTranslationContext'

const BalajiCategoryPage = (props) => {
  const { getTranslatedText } = usePageTranslation()

  return (
    <MurtiCategoryTemplate
      categoryId="balaji"
      title={getTranslatedText("Shri Balaji Murti")}
      subtitle={getTranslatedText("Divine craftsmanship carved in stone")}
      {...props}
    />
  )
}

export default BalajiCategoryPage
