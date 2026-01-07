import { useState } from "react"
import { useUpdateBioLink } from "../../hooks/useBioLinkMutations"

export default function EditRow({ link, onCancel, onSave }) {
  const [formData, setFormData] = useState({
    linkText: link.linkText || "",
    href: link.href || "",
    youTubeId: link.youTubeId || "",
    youTubeTitle: link.youTubeTitle || "",
  })
  const updateMutation = useUpdateBioLink()

  const handleSave = () => {
    if (window.confirm(`Save "${formData?.linkText}"?`)) {
      updateMutation.mutate(
        { id: link.id, data: formData },
        { onSuccess: onSave },
      )
    }
  }

  return (
    <tr className="admin-edit-row">
      <td>
        <input
          value={formData.linkText}
          onChange={(e) =>
            setFormData({ ...formData, linkText: e.target.value })
          }
          required
        />
      </td>
      <td>
        <input
          value={formData.href}
          onChange={(e) => setFormData({ ...formData, href: e.target.value })}
        />
      </td>
      <td>
        <input
          value={formData.youTubeId}
          onChange={(e) =>
            setFormData({ ...formData, youTubeId: e.target.value })
          }
        />
      </td>
      <td>
        <input
          value={formData.youTubeTitle}
          onChange={(e) =>
            setFormData({ ...formData, youTubeTitle: e.target.value })
          }
        />
      </td>
      <td>{new Date(link.created).toLocaleDateString()}</td>
      <td>
        <button onClick={handleSave} disabled={updateMutation.isPending}>
          {updateMutation.isPending ? "Saving..." : "Save"}
        </button>
        <button onClick={onCancel}>Cancel</button>
      </td>
    </tr>
  )
}
