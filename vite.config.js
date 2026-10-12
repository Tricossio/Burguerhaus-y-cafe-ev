import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

const repositoryName = process.env.GITHUB_REPOSITORY?.split('/').pop()
const isUserOrOrganizationPage = repositoryName?.endsWith('.github.io')

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  appType: 'spa',
  base:
    repositoryName && !isUserOrOrganizationPage
      ? `/${repositoryName}/`
      : '/',
})
