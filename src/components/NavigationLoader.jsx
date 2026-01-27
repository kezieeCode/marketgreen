import { useNavigation } from '../context/NavigationContext.jsx'
import './NavigationLoader.css'

function NavigationLoader() {
  const { isNavigating } = useNavigation()

  if (!isNavigating) return null

  return (
    <div className="navigation-loader-overlay">
      <div className="spinkit-loader">
        <div className="spinkit-spinner">
          <div className="spinkit-bounce1"></div>
          <div className="spinkit-bounce2"></div>
          <div className="spinkit-bounce3"></div>
        </div>
      </div>
    </div>
  )
}

export default NavigationLoader
