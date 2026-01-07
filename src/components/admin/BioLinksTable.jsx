import { useState } from "react"
import { useDeleteBioLink } from "../../hooks/useBioLinkMutations"
import EditRow from "./EditRow"

export default function BioLinksTable({ bioLinks }) {
  const [editingId, setEditingId] = useState(null)
  const deleteMutation = useDeleteBioLink()

  const handleDelete = (id, linkText) => {
    if (window.confirm(`Delete "${linkText}"?`)) {
      deleteMutation.mutate(id)
    }
  }

  return (
    <table className="admin-table">
      <thead>
        <tr>
          <th>Link Text</th>
          <th>URL</th>
          <th>YouTube ID</th>
          <th>YouTube Title</th>
          <th>Created</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {bioLinks.map((link) =>
          editingId === link.id ? (
            <EditRow
              key={link.id}
              link={link}
              onCancel={() => setEditingId(null)}
              onSave={() => setEditingId(null)}
            />
          ) : (
            <tr key={link.id}>
              <td>{link.linkText}</td>
              <td>{link.href || "-"}</td>
              <td>{link.youTubeId || "-"}</td>
              <td>{link.youTubeTitle || "-"}</td>
              <td>{new Date(link.created).toLocaleDateString()}</td>
              <td>
                <button onClick={() => setEditingId(link.id)}>Edit</button>
                <button
                  onClick={() => handleDelete(link.id, link.linkText)}
                  disabled={deleteMutation.isPending}
                >
                  Delete
                </button>
              </td>
            </tr>
          )
        )}
      </tbody>
    </table>
  )
}
