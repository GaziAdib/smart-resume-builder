import React from 'react'
import AddSkillForm from './AddSkillForm'
import AddDevSkillForm from './AddDevSkillForm'

const AddRootSkillForm = () => {
  return (
    <div className="space-y-8">
    <AddSkillForm />
    <AddDevSkillForm />
  </div>
  )
}

export default AddRootSkillForm