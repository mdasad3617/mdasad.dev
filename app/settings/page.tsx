import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { SettingsIcon, Palette, Database } from "lucide-react"

export default function SettingsPage() {
  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold">Settings</h1>
        <p className="text-muted-foreground text-lg">
          Configure your personal content hub preferences and integrations.
        </p>
      </div>

      <div className="grid gap-6 max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Palette className="h-5 w-5" />
              Appearance
            </CardTitle>
            <CardDescription>Customize the look and feel of your content hub</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Theme</h4>
                  <p className="text-sm text-muted-foreground">Choose your preferred color scheme</p>
                </div>
                <Button variant="outline" size="sm">
                  Dark Mode
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5" />
              Data Management
            </CardTitle>
            <CardDescription>Manage your content and data preferences</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Export Data</h4>
                  <p className="text-sm text-muted-foreground">Download all your content as JSON</p>
                </div>
                <Button variant="outline" size="sm">
                  Export
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <SettingsIcon className="h-5 w-5" />
              General
            </CardTitle>
            <CardDescription>General application settings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Public Access</h4>
                  <p className="text-sm text-muted-foreground">All content is publicly viewable</p>
                </div>
                <div className="text-sm text-green-600 font-medium">Enabled</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
