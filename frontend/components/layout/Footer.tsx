export function Footer() {
  return (
    <footer className="bg-borg-dark border-t border-borg-border py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-md bg-linear-to-br from-borg-green to-borg-green-light flex items-center justify-center">
              <span className="text-white font-bold text-xs">X</span>
            </div>
            <span className="text-borg-gray text-sm">
              © {new Date().getFullYear()} XBorg Assessment. All rights
              reserved.
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
