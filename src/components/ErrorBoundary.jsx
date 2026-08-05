import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('RankTop App Error Catch:', error, errorInfo);
    this.setState({ errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#121212] text-white flex items-center justify-center p-6 font-sans">
          <div className="bg-[#171717] border border-[#262626] rounded-2xl p-8 max-w-2xl w-full space-y-4 shadow-2xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-rose-500/10 text-rose-400 flex items-center justify-center border border-rose-500/20 shrink-0">
                <AlertCircle className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-white font-sans">RankTop Workspace Diagnostic Error</h2>
                <p className="text-sm text-zinc-400">Caught runtime error during rendering:</p>
              </div>
            </div>

            <div className="p-4 bg-[#121212] rounded-xl border border-[#262626] text-sm font-mono text-rose-300 overflow-x-auto whitespace-pre-wrap max-h-60">
              {this.state.error?.toString() || 'Unknown Error'}
              {'\n\n'}
              {this.state.errorInfo?.componentStack || ''}
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => {
                  this.setState({ hasError: false, error: null, errorInfo: null });
                }}
                className="px-4 py-2 bg-[#262626] hover:bg-[#333] text-zinc-300 font-semibold text-sm rounded-xl border border-[#333]"
              >
                Reset State
              </button>
              <button
                onClick={() => window.location.reload()}
                className="px-5 py-2 bg-[#3ECF8E] hover:bg-[#34D399] text-black font-bold text-sm rounded-xl shadow inline-flex items-center gap-1.5"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Reload Page</span>
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
