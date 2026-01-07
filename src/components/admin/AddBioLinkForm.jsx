import { useState } from "react"
import { useCreateBioLink } from "../../hooks/useBioLinkMutations"

export default function AddBioLinkForm() {
  const [isOpen, setIsOpen] = useState(false)
  const [formData, setFormData] = useState({
    linkText: "",
    href: "",
    youTubeId: "",
    youTubeTitle: "",
  })
  const createMutation = useCreateBioLink()

  const handleSubmit = (e) => {
    e.preventDefault()
    createMutation.mutate(formData, {
      onSuccess: () => {
        setFormData({ linkText: "", href: "", youTubeId: "", youTubeTitle: "" })
        setIsOpen(false)
      },
    })
  }

  if (!isOpen) {
    return (
      <button className="admin-add-btn" onClick={() => setIsOpen(true)}>
        Add New BioLink
      </button>
    )
  }

  return (
    <form className="admin-add-form" onSubmit={handleSubmit}>
      <input
        placeholder="Link Text *"
        value={formData.linkText}
        onChange={(e) => setFormData({ ...formData, linkText: e.target.value })}
        required
      />
      <input
        placeholder="URL (href)"
        value={formData.href}
        onChange={(e) => setFormData({ ...formData, href: e.target.value })}
      />
      <input
        placeholder="YouTube ID (optional)"
        value={formData.youTubeId}
        onChange={(e) => setFormData({ ...formData, youTubeId: e.target.value })}
      />
      <input
        placeholder="YouTube Title (optional)"
        value={formData.youTubeTitle}
        onChange={(e) => setFormData({ ...formData, youTubeTitle: e.target.value })}
      />
      <div className="admin-form-actions">
        <button type="submit" disabled={createMutation.isPending}>
          {createMutation.isPending ? "Saving..." : "Save"}
        </button>
        <button type="button" onClick={() => setIsOpen(false)}>
          Cancel
        </button>
      </div>
    </form>
  )
}
