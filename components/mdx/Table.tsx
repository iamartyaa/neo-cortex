interface TableProps {
  children: React.ReactNode;
}

export function Table({ children }: TableProps) {
  return (
    <div className="my-8 overflow-x-auto rounded-lg border-4 border-border shadow-neo">
      <table className="w-full text-sm">
        {children}
      </table>
    </div>
  );
}

export function TableHead({ children }: TableProps) {
  return (
    <thead className="bg-primary/10 border-b-2 border-border">
      {children}
    </thead>
  );
}

export function TableBody({ children }: TableProps) {
  return <tbody className="divide-y divide-border">{children}</tbody>;
}

export function TableRow({ children }: TableProps) {
  return (
    <tr className="hover:bg-muted/50 transition-colors">
      {children}
    </tr>
  );
}

export function TableHeader({ children }: TableProps) {
  return (
    <th className="px-4 py-3 text-left font-bold uppercase tracking-wider text-xs">
      {children}
    </th>
  );
}

export function TableCell({ children }: TableProps) {
  return (
    <td className="px-4 py-3 font-mono">
      {children}
    </td>
  );
}

