import InitialModal from "@/components/modals/initial-modal"
import { db } from "@/lib/db"
import { initialProfile } from "@/lib/initial-profile"
import {redirect} from 'next/navigation'

const SetupPage = async() => {
  
  const profile = await initialProfile()

  // Finding servers that the user is a member of
  const server = await db.server.findFirst({
    where: {
      members: {
        some:{
          profileId: profile?.id
        }
      }
    }
  });

  if(server){
    redirect(`/servers/${server.id}`)
  }
  
  return (
    <InitialModal/>
  )
}

export default SetupPage

// Cyberpunk:

// Background: #0E111F
// Text: #E9E9E9
// Accent: #6DFD60
// Sidebar: #272A3E