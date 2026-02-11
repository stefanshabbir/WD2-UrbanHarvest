import { useState, useEffect } from 'react'
import { Bell, BellOff } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function NotificationButton() {
    const [permission, setPermission] = useState<NotificationPermission>('default')

    useEffect(() => {
        if ('Notification' in window) {
            setPermission(Notification.permission)
        }
    }, [])

    const requestPermission = async () => {
        if (!('Notification' in window)) {
            alert('This browser does not support desktop notification')
            return
        }

        try {
            const result = await Notification.requestPermission()
            setPermission(result)
            if (result === 'granted') {
                new Notification('Urban Harvest Hub', {
                    body: 'You are now subscribed to notifications!',
                    icon: '/pwa-192x192.png'
                })
            }
        } catch (error) {
            console.error('Error requesting notification permission:', error)
        }
    }

    if (permission === 'granted') {
        return (
            <Button variant="outline" size="sm" disabled className="gap-2 border-harvest-green text-harvest-green bg-white/10">
                <Bell className="h-4 w-4" />
                Notifications On
            </Button>
        )
    }

    return (
        <Button
            variant="outline"
            size="sm"
            onClick={requestPermission}
            className="gap-2 border-white/30 bg-white/10 text-white hover:bg-white/20 hover:text-white hover:border-white transition-colors"
        >
            <BellOff className="h-4 w-4" />
            Enable Notifications
        </Button>
    )
}
