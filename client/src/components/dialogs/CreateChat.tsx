import { Input } from "@components/shared/Inputs/GenericInput";
import { CreateChatMutation } from "@generated/CreateChatMutation.graphql";
import { Description, Dialog, DialogPanel, DialogTitle } from "@headlessui/react"
import { useState } from "react";
import { useMutation } from "react-relay";
import { graphql } from "relay-runtime";

interface CreateChatProps {
  open: boolean;
  setIsOpen: (open: boolean) => void
}

const mutation = graphql`
  mutation CreateChatMutation($input:CreateChatInput!) {
    createChat(createChatInput:$input){      
      id
    }
  }
`

export const CreateChat = ({ open, setIsOpen }: CreateChatProps) => {
  const [chatName, setChatName] = useState("")
  const [participants, setParticipants] = useState([])
  const [commitMutation, isMutationInFlight] = useMutation<CreateChatMutation>(mutation)
  return (
    <Dialog open={open} onClose={() => setIsOpen(false)}>
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        <DialogPanel className="max-w-lg space-y-4 border bg-white p-12">
          <DialogTitle className="font-bold">Deactivate account</DialogTitle>
          <Description>This will permanently deactivate your account</Description>
          <Input title={"Chat name"}
            onChange={(e) => setChatName(e.currentTarget.value)}
          />
          <div className="flex gap-4">
            <button onClick={() => setIsOpen(false)}>Cancel</button>
            <button onClick={() => commitMutation(
              {
                variables: {
                  input: {
                    name: chatName,
                    participants: participants
                  }
                }
              }
            )}>Create</button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  )
}