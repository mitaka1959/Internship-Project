using EasyStays.Domain.Entities;
using EasyStays.Domain.Enums;

namespace EasyStays.Domain.Helpers
{
    public static class CaltulateRoomCapacity
    {
        public static int CalculateRoomCapacity(Room room)
        {
            int totalCapacity = 0;
            foreach (var bedConfig in room.BedConfigurations)
            {
                totalCapacity += BedTypeCalculator.GetCapacity(bedConfig.BedType) * bedConfig.Quantity;
            }
            return totalCapacity;
        }
    }
}
