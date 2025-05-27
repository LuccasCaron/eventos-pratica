export default function GuestList({ guests, onGuestChange, onAdd }) {
  return (
    <>
      {guests.map((g,i) => (
        <div key={i} className="grid grid-cols-2 gap-4">
          <input type="text" name="nome" value={g.nome} onChange={e=>onGuestChange(i,e)} placeholder="Nome do convidado" required />
          <input type="email" name="email" value={g.email} onChange={e=>onGuestChange(i,e)} placeholder="E-mail do convidado" required />
        </div>
      ))}
      <button type="button" onClick={onAdd}>+ Adicionar convidado</button>
    </>
  )
}