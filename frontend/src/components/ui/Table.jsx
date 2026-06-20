export default function Table({ columns, rows, renderActions }) {
  return (
    <div className="table-wrap">
      <table>
        <thead><tr>{columns.map((col) => <th key={col.key}>{col.label}</th>)}{renderActions && <th>Aksi</th>}</tr></thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={row.id || index}>{columns.map((col) => <td key={col.key}>{col.render ? col.render(row, index) : row[col.key]}</td>)}{renderActions && <td>{renderActions(row)}</td>}</tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
