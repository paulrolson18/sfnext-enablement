import { HashRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ProgressProvider } from './context/ProgressContext'
import Layout from './components/Layout'
import Overview from './pages/Overview'
import PreWork from './pages/PreWork'
import EnvCheck from './pages/EnvCheck'
import Module1 from './pages/Module1'
import Module2 from './pages/Module2'
import Module3 from './pages/Module3'
import Module4 from './pages/Module4'
import DemoPlaybook from './pages/DemoPlaybook'
import CheatSheet from './pages/CheatSheet'

export default function App() {
  return (
    <ProgressProvider>
      <HashRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Overview />} />
            <Route path="pre-work" element={<PreWork />} />
            <Route path="env-check" element={<EnvCheck />} />
            <Route path="module/1" element={<Module1 />} />
            <Route path="module/2" element={<Module2 />} />
            <Route path="module/3" element={<Module3 />} />
            <Route path="module/4" element={<Module4 />} />
            <Route path="demo-playbook" element={<DemoPlaybook />} />
            <Route path="cheat-sheet" element={<CheatSheet />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </HashRouter>
    </ProgressProvider>
  )
}
