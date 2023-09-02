export type ServersWithMembersWithProfiles = Server & {
    channels:Channel[],
    members: (Member & {profile:Profile})[]
}