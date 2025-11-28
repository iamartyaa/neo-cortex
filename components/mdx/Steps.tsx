interface StepProps {
  number: number;
  title: string;
  children: React.ReactNode;
}

export function Step({ number, title, children }: StepProps) {
  return (
    <div className="my-6 flex gap-4">
      <div className="flex-shrink-0">
        <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-border bg-primary text-primary-foreground font-bold shadow-neo">
          {number}
        </div>
      </div>
      <div className="flex-1 pt-1">
        <h4 className="font-bold text-lg mb-2">{title}</h4>
        <div className="text-muted-foreground">{children}</div>
      </div>
    </div>
  );
}

interface StepsProps {
  children: React.ReactNode;
}

export function Steps({ children }: StepsProps) {
  return <div className="my-8 space-y-2">{children}</div>;
}

