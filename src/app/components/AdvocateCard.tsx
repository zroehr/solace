'use client';

import type { Advocate } from '../types';
import { Card, CardContent, CardHeader } from './ui/card';
import { Badge } from './ui/badge';
import { Phone, GraduationCap, MapPin } from 'lucide-react';

interface AdvocateCardProps {
  advocate: Advocate;
}

export function AdvocateCard({ advocate }: AdvocateCardProps) {
  const formatPhoneNumber = (phone: number) => {
    const phoneStr = phone.toString();
    return `(${phoneStr.slice(0, 3)}) ${phoneStr.slice(3, 6)}-${phoneStr.slice(
      6
    )}`;
  };

  return (
    <Card className="h-full hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="space-y-1">
          <h3 className="text-xl font-semibold">
            {advocate.firstName} {advocate.lastName}
          </h3>
          <div className="flex items-center gap-2 text-muted-foreground">
            <GraduationCap className="h-4 w-4" />
            <span>{advocate.degree}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-sm">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span>{advocate.city}</span>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <Phone className="h-4 w-4 text-muted-foreground" />
            <span>{formatPhoneNumber(advocate.phoneNumber)}</span>
          </div>

          <div>
            <p className="text-sm font-medium mb-2">Specialties:</p>
            <div className="flex flex-wrap gap-2">
              {advocate.specialties.map((specialty) => (
                <Badge key={specialty} variant="secondary" className="text-xs">
                  {specialty}
                </Badge>
              ))}
            </div>
          </div>

          <div className="text-sm">
            <span className="font-medium">Experience: </span>
            {advocate.yearsOfExperience} years
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
