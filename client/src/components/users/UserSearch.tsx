import { Input, InputProps } from "@components/shared/Inputs/GenericInput"
import { UserSearchQuery, UserSearchQuery$data } from "@generated/UserSearchQuery.graphql"
import { useCallback, useEffect, useState } from "react"
import { useRelayEnvironment } from "react-relay"
import { fetchQuery, graphql } from "relay-runtime"


const query = graphql`
    query UserSearchQuery($username:String!) {
    users(username: $username) {
      id
      username
    }
  }
`

export const UserSearch = () => {
  const env = useRelayEnvironment()
  const [input, setInput] = useState<string>("")
  const [isTyping, setIsTyping] = useState<boolean>(false)
  const [res, setRes] = useState<ReadonlyArray<{ id: string, username: string }>>([])

  const fetch = useCallback((username: string) => {
    if (username === "") return null
    console.log(username)
    return fetchQuery<UserSearchQuery>(
      env,
      query,
      { username: username },
    ).toPromise().then((result) => result)
  }, [input])

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      setIsTyping(false);
    }, 2000)

    return () => clearTimeout(delayDebounceFn)
  }, [isTyping])

  return (
    <div>
      <Input
        title={"search users"}
        onChange={async (e) => {
          const result = await fetch(e.currentTarget.value)
          if (result?.users) {
            setRes(result.users)
            return;
          }
          setRes([])

        }}
      />
      {res ? res.map((user) => (<p key={user.id}>{user.username}</p>)) : null}
    </div>
  )
}