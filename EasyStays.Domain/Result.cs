﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EasyStays.Domain
{
    public class Result
    {
        public bool IsSuccess { get; init; }
        public bool IsFailure => !IsSuccess;
        public string Error { get; init; }

        public static Result Success() => new Result { IsSuccess = true };
        public static Result Failure(string error) => new Result { IsSuccess = false, Error = error };
    }

    public class Result<T> : Result
    {
        public T Value { get; init; }

        public static Result<T> Success(T value) => new Result<T> { IsSuccess = true, Value = value };
        public new static Result<T> Failure(string error) => new Result<T> { IsSuccess = false, Error = error };
    }
}

