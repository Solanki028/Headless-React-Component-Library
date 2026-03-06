import { useState, useRef, useEffect } from 'react'
import { Dialog, Dropdown, Tabs, Accordion } from '../../src/index'
import './App.css'

function App() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const dialogTriggerRef = useRef<HTMLButtonElement>(null)


  useEffect(() => {
    console.log('Dialog trigger ref:', dialogTriggerRef.current)
  }, [])

  return (
    <div className="min-h-screen bg-slate-50 p-8 font-sans text-slate-900">
      <div className="mx-auto max-w-4xl space-y-12">
        <header className="space-y-4">
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            Headless Kit <span className="text-blue-600">Showcase</span>
          </h1>
          <p className="max-w-2xl text-lg text-slate-600">
            A production-ready headless component library built for flexibility, accessibility, and performance.
          </p>
        </header>

        <section className="grid gap-8 md:grid-cols-2">

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm ring-1 ring-slate-900/5 transition-shadow hover:shadow-md">
            <h2 className="mb-4 text-xl font-bold text-slate-900 text-center">Dialog</h2>
            <div className="flex justify-center">
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <Dialog.Trigger
                  ref={dialogTriggerRef}
                  className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all hover:bg-blue-700 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                >
                  Open Modal
                </Dialog.Trigger>
                <Dialog.Content className="max-w-md overflow-hidden bg-white p-0">
                  <div className="px-6 py-4">
                    <Dialog.Title className="text-lg font-bold text-slate-900">User Settings</Dialog.Title>
                    <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                      Update your account preferences here. This modal is fully accessible and supports focus trapping and restoration using <code>forwardRef</code>.
                    </p>
                    <div className="mt-6 flex flex-col gap-3">
                      <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">Display Name</label>
                      <input type="text" placeholder="Enter your name" className="rounded-md border border-slate-200 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
                    </div>
                  </div>
                  <div className="flex justify-end gap-3 bg-slate-50 px-6 py-4 border-t border-slate-100">
                    <Dialog.Close className="rounded-md px-3 py-1.5 text-sm font-medium text-slate-600 hover:bg-slate-200">
                      Cancel
                    </Dialog.Close>
                    <button onClick={() => setIsDialogOpen(false)} className="rounded-md bg-blue-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-blue-700">
                      Save Changes
                    </button>
                  </div>
                </Dialog.Content>
              </Dialog>
            </div>
          </div>


          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm ring-1 ring-slate-900/5 transition-shadow hover:shadow-md">
            <h2 className="mb-4 text-xl font-bold text-slate-900 text-center">Dropdown Menu</h2>
            <div className="flex justify-center">
              <Dropdown>
                <Dropdown.Trigger className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50 outline-none focus:ring-2 focus:ring-slate-100 transition-colors">
                  Options Menu
                  <svg className="h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </Dropdown.Trigger>
                <Dropdown.Content className="mt-2 w-56 origin-top-right rounded-xl border border-slate-100 bg-white p-1.5 shadow-xl ring-1 ring-black/5 outline-none">
                  <Dropdown.Item className="group flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-sm text-slate-700 outline-none transition-colors hover:bg-blue-50 hover:text-blue-600 focus:bg-blue-50 focus:text-blue-600">
                    View Profile
                  </Dropdown.Item>
                  <Dropdown.Item className="group flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-sm text-slate-700 outline-none transition-colors hover:bg-blue-50 hover:text-blue-600 focus:bg-blue-50 focus:text-blue-600">
                    Settings
                  </Dropdown.Item>
                  <div className="my-1 h-px bg-slate-100" />
                  <Dropdown.Item className="group flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-sm text-red-600 outline-none transition-colors hover:bg-red-50 focus:bg-red-50">
                    Log Out
                  </Dropdown.Item>
                </Dropdown.Content>
              </Dropdown>
            </div>
          </div>
        </section>

        <section className="grid gap-8 md:grid-cols-2">

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm ring-1 ring-slate-900/5">
            <h2 className="mb-4 text-xl font-bold text-slate-900">Tabs</h2>
            <Tabs defaultValue="overview" className="w-full">
              <Tabs.List className="flex gap-1 rounded-xl bg-slate-100 p-1">
                <Tabs.Trigger value="overview" className="flex-1 rounded-lg px-3 py-1.5 text-sm font-medium transition-all data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm outline-none">
                  Overview
                </Tabs.Trigger>
                <Tabs.Trigger value="stats" className="flex-1 rounded-lg px-3 py-1.5 text-sm font-medium transition-all data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm outline-none">
                  Stats
                </Tabs.Trigger>
              </Tabs.List>
              <div className="mt-4 rounded-lg bg-slate-50 min-h-[100px] overflow-hidden">
                {/* forceMount allows keeping components in DOM for animations/SEO */}
                <Tabs.Content
                  value="overview"
                  forceMount
                  className="text-sm text-slate-600 p-4 transition-all duration-300 hidden data-[state=active]:block data-[state=active]:animate-in data-[state=active]:fade-in"
                >
                  Quick summary of your project progress and recent activities.
                </Tabs.Content>
                <Tabs.Content
                  value="stats"
                  className="text-sm text-slate-600 p-4 animate-in fade-in duration-300"
                >
                  Detailed analytics and performance metrics for the current period.
                </Tabs.Content>
              </div>
            </Tabs>
          </div>


          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm ring-1 ring-slate-900/5">
            <h2 className="mb-4 text-xl font-bold text-slate-900">Accordion</h2>
            <Accordion type="single" collapsible className="space-y-3">
              <Accordion.Item value="q1" className="rounded-xl border border-slate-100 bg-slate-50/50 overflow-hidden">
                <Accordion.Trigger className="group flex w-full items-center justify-between px-4 py-3 text-left text-sm font-medium text-slate-900 hover:bg-slate-100 transition-colors outline-none focus-visible:ring-2 focus-visible:ring-blue-500">
                  What is this toolkit?
                  <svg className="h-4 w-4 text-slate-400 transition-transform duration-200 group-data-[state=open]:rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M6 9l6 6 6-6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Accordion.Trigger>
                <Accordion.Content className="px-4 py-3 text-sm text-slate-600 bg-white border-t border-slate-100 animate-in slide-in-from-top-2 duration-200">
                  A collection of headless React components following accessibility best practices.
                </Accordion.Content>
              </Accordion.Item>
              <Accordion.Item value="q2" className="rounded-xl border border-slate-100 bg-slate-50/50 overflow-hidden">
                <Accordion.Trigger className="group flex w-full items-center justify-between px-4 py-3 text-left text-sm font-medium text-slate-900 hover:bg-slate-100 transition-colors outline-none focus-visible:ring-2 focus-visible:ring-blue-500">
                  How do I style it?
                  <svg className="h-4 w-4 text-slate-400 transition-transform duration-200 group-data-[state=open]:rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M6 9l6 6 6-6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Accordion.Trigger>
                <Accordion.Content className="px-4 py-3 text-sm text-slate-600 bg-white border-t border-slate-100">
                  You can use Tailwind CSS, CSS-in-JS, or plain CSS. The library provides only the logic.
                </Accordion.Content>
              </Accordion.Item>
            </Accordion>
          </div>
        </section>
      </div>

      <footer className="mt-20 border-t border-slate-200 py-8 text-center text-sm text-slate-500">
        &copy; 2024 Headless Kit. Production Ready & Accessibility Focused.
      </footer>
    </div>
  )
}

export default App
