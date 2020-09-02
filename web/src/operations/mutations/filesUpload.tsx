import { gql } from "@apollo/client"

export const FILES_UPLOAD = gql`
  mutation files_upload (
    $file: FileInput!
  ) {
    action: files_upload(
      arg1: $FileOutput!
    )
  }
`
