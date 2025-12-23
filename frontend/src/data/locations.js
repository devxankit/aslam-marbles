// Indian Location Images
import mumbaiImg from '../assets/locationicons/india location/mumbai.png'
import delhiImg from '../assets/locationicons/india location/delhi.png'
import ahmedabadImg from '../assets/locationicons/india location/ahmedabad.png'
import kolkataImg from '../assets/locationicons/india location/kolkata.png'
import puneImg from '../assets/locationicons/india location/pune.png'
import suratImg from '../assets/locationicons/india location/surat.png'
import jaipurImg from '../assets/locationicons/india location/jaipur.png'
import bengaluruImg from '../assets/locationicons/india location/bengaluru.png'
import hyderabadImg from '../assets/locationicons/india location/hyderabad.png'

// International Location Images
import usaImg from '../assets/locationicons/international/usa.png'
import dubaiImg from '../assets/locationicons/international/dubai.png'
import australiaImg from '../assets/locationicons/international/australia.png'
import tanzaniaImg from '../assets/locationicons/international/tanzania.png'
import ukImg from '../assets/locationicons/international/uk.png'

export const indianLocations = [
  { name: 'MUMBAI', image: mumbaiImg },
  { name: 'DELHI', image: delhiImg },
  { name: 'AHMEDABAD', image: ahmedabadImg },
  { name: 'KOLKATA', image: kolkataImg },
  { name: 'PUNE', image: puneImg },
  { name: 'SURAT', image: suratImg },
  { name: 'JAIPUR', image: jaipurImg },
  { name: 'BENGALURU', image: bengaluruImg },
  { name: 'HYDERABAD', image: hyderabadImg }
]

export const internationalLocations = [
  { name: 'USA', image: usaImg },
  { name: 'DUBAI', image: dubaiImg },
  { name: 'AUSTRALIA', image: australiaImg },
  { name: 'TANZANIA', image: tanzaniaImg },
  { name: 'UK', image: ukImg }
]

export const formatLocationName = (name) => {
  return name.charAt(0) + name.slice(1).toLowerCase()
}

