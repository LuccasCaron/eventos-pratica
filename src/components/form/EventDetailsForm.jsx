export default function EventDetailsForm({ form, onChange, temas }) {
  return (
    <>
      <input type="date" name="data" value={form.data} onChange={onChange} required />
      <input type="time" name="hora" value={form.hora} onChange={onChange} required />
      <select name="tipo" value={form.tipo} onChange={onChange} required>
        <option value="">Tipo de evento</option>
        <option value="casamento">Casamento</option>
        <option value="aniversario">Aniversário</option>
        <option value="formatura">Formatura</option>
        <option value="corporativo">Corporativo</option>
        <option value="outro">Outro</option>
      </select>
      <select name="tema" value={form.tema} onChange={onChange} required>
        <option value="">Tema da festa</option>
        {Object.keys(temas).map(t => <option key={t} value={t}>{t}</option>)}
      </select>
      {form.tema === "personalizado" && (
        <input type="text" name="temaPersonalizado" value={form.temaPersonalizado} onChange={onChange} placeholder="Descreva o tema" />
      )}
    </>
  )
}