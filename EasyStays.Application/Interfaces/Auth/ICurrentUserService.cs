﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EasyStays.Application.Interfaces.Auth
{
    public interface ICurrentUserService
    {
        string? UserId { get; }
    }
}
