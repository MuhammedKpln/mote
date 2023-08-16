export enum ApiPaths {
  Login = "/auth/log-in",
  Notes = "/notes",
  DeleteMultipleNotes = ApiPaths.Notes + "/selections",
  DeleteMultipleTags = "/tags/selections",
  AddMultipleTags = "/tags/selections",
}
